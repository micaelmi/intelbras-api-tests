"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { InputItem } from "@/components/form-item";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import api from "@/lib/axios";
import AxiosDigestAuth from "@mhoc/axios-digest-auth";

/**
 * http://{{device_ip}}/cgi-bin/recordUpdater.cgi
 * ?action=insert ==> Comando de inserção de usuário
 * &name=AccessControlCard
 * &CardNo=16 ==> Código do Cartão em Hexadecimal, exemplo: AF79FCC0
 * &CardStatus ==> 0: Normal, 1: Cancelado, 2: Congelado (number)
 * &CardName ==> Nome do Usuário, exemplo: Alexandre Alves
 * &UserID ==> ID do Usuário, exemplo: 16 (number)
 * &Password ==> Senha de Acesso do Usuário, exemplo: 878485 (number)
 * &Doors[0]=0 ==> portas às quais o usuário tem acesso
 */

const FormSchema = z.object({
  cardNo: z.string({ message: "Digite um número" }),
  cardName: z.string().min(6, {
    message: "Digite o nome completo.",
  }),
});

export default function CreateUser() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      cardNo: "",
      cardName: "",
    },
  });
  const digestAuth = new AxiosDigestAuth({
    username: "admin",
    password: "admin123",
  });
  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      const url = `http://192.168.1.144/cgi-bin/recordUpdater.cgi?action=insert&name=AccessControlCard&UserID=${data.cardNo}&CardNo=${data.cardNo}&CardName=${data.cardName}&CardStatus=0`;

      const response = await digestAuth.request({
        headers: { Accept: "application/json" },
        method: "GET",
        url: url,
      });
      if (response.status === 200) {
        toast.success("Usuário registrado!", {
          theme: "colored",
        });
        form.reset({
          cardNo: "",
          cardName: "",
        });
      }
    } catch (error) {
      toast.error("Erro ao registrar", {
        theme: "colored",
      });
      console.error("Erro:", error);
      throw error;
    }
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Criar Usuário</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Criar Usuário</DialogTitle>
          <DialogDescription>
            Cadastre um novo usuário na leitora intelbras.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full space-y-4"
          >
            <InputItem
              control={form.control}
              name="cardNo"
              label="Código"
              placeholder="Digite o código do usuário"
            />
            <InputItem
              control={form.control}
              name="cardName"
              label="Nome completo"
              placeholder="Digite o nome do usuário"
            />
            <DialogFooter>
              <Button type="submit" className="w-full">
                Salvar
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
